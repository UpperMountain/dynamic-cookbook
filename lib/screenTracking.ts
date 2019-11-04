import * as Segment from "expo-analytics-segment";
import { isEqual } from "lodash";
import {
  NavigationLeafRoute,
  NavigationParams,
  NavigationState
} from "react-navigation";

// adapted from https://reactnavigation.org/docs/en/screen-tracking.html

// gets the current screen from navigation state
function getActiveRouteName(
  navigationState: NavigationState | NavigationLeafRoute<NavigationParams>
): { name: string; params?: object } | null {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }

  return { name: route.routeName, params: route.params };
}

export function trackNavStateChange(
  prev: NavigationState,
  next: NavigationState
) {
  const nextRoute = getActiveRouteName(next);
  const prevRoute = getActiveRouteName(prev);

  // Deep-compare routes, if different, fire event.
  if (!isEqual(nextRoute, prevRoute) && nextRoute !== null) {
    Segment.screenWithProperties(nextRoute.name, nextRoute.params || {});
  }
}
