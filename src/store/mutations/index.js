import { sectionMutations } from "./sectionMutations";
import { layoutMutations } from "./layoutMutations";
import { pageMutation } from "./pageMutation";
import { themeMutation } from "./themeMutation";
import { settingMutation } from "./settingMutations";
import { modalMutation } from "./modalMutation";

export default {
  ...sectionMutations,
  ...layoutMutations,
  ...pageMutation,
  ...themeMutation,
  ...settingMutation,
  ...modalMutation,
};
