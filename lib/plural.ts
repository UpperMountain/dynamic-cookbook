function round(amt: number, accuracy: number): number {
  // Round to closest multiple of `round`.
  return Math.round(amt / accuracy) * accuracy;
}

function format(amt: number): string {
  // Don't display decimal places for integers. Otherwise, display two.
  const formatted: string =
    amt % 1 === 0
      ? amt.toString()
      : Math.abs((amt * 100) % 10) < 1 // valid for 0.500111
      ? amt.toFixed(1)
      : amt.toFixed(2);

  return formatted;
}

export function qty(
  amt: number,
  accuracy: number,
  singular?: string,
  plural?: string
) {
  const rounded = round(amt, accuracy);
  const formatted = format(rounded);

  if (!singular && !plural) {
    return formatted;
  }

  if (rounded === 1 || !plural) {
    return `${formatted} ${singular}`;
  } else {
    return `${formatted} ${plural}`;
  }
}

export function plural(
  amt: number,
  accuracy: number,
  singular: string,
  plural: string
) {
  const rounded = round(amt, accuracy);
  if (rounded === 1) {
    return singular;
  } else {
    return plural;
  }
}
