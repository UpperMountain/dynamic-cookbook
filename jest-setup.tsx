// @ts-ignore
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

// Mock out async-storage
jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);
