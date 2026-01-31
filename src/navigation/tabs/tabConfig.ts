import type { MainTabParamList } from "../types";
import {
  GridIcon,
  PlayIcon,
  Playlist01Icon,
  Menu01Icon,
} from "../../constants/icons";

export const TAB_ICONS = {
  Dashboard: GridIcon,
  Watch: PlayIcon,
  MediaLibrary: Playlist01Icon,
  More: Menu01Icon,
} as const;

export const TAB_LABELS: Record<keyof MainTabParamList, string> = {
  Dashboard: "Dashboard",
  Watch: "Watch",
  MediaLibrary: "Media Library",
  More: "More",
};
