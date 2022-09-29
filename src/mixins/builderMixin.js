import { mapMutations } from "vuex";
import { cloneDeep } from "lodash";
import componentMixin from "./componentMixin";
import themeMixin from "./themeMixin";

export default {
  mixins: [componentMixin, themeMixin],
  computed: {
    openSlider() {
      return this.$store.state.openSlider;
    },
    activeSlider() {
      return this.$store.state.activeSlider;
    },
    activePosition: {
      get() {
        return this.$store.state.activePosition;
      },
      set(value) {
        this.setActivatePosition(value);
      },
    },
    edit() {
      return this.$store.state.edit;
    },
    openPageSettingModal: {
      get() {
        return this.$store.state.modals.openPageSettingModal;
      },
      set(value) {
        if (value) {
          this.$store.commit("openPageSetting");
        } else {
          this.$store.commit("closePageSetting");
        }
      },
    },
    allCategories() {
      return this.$store.state.allCategories;
    },
    moduleCategories() {
      return this.$store.state.moduleCategories;
    },
    headerSections() {
      const headerCategory = this.allCategories.find(
        (category) => category.name === "Header"
      );
      return headerCategory.sections || [];
    },
    footerSections() {
      const footerCategory = this.allCategories.find(
        (category) => category.name === "Footer"
      );
      if (footerCategory) {
        return footerCategory.sections;
      }
      return [];
    },
  },
  methods: {
    appendSection(position) {
      if (this.activePage) {
        if (this.activePosition === "header") {
          this.activePosition = 0;
        } else if (this.activePosition === "footer") {
          this.activePosition = this.activeSections
            ? this.activeSections.length
            : 0;
        } else {
          this.activePosition = this.activePosition + 1;
        }
        this.addEmptySection(position);
      }
    },
    prependSection(position) {
      if (this.activePage) {
        if (this.activePosition === "header") {
          this.activePosition = 0;
        } else if (this.activePosition === "footer") {
          this.activePosition = this.activeSections
            ? this.activeSections.length
            : 0;
        }
        this.addEmptySection(position);
      }
    },
    removeEmptySection() {
      const indexOfNullSection = this.activeSections?.indexOf(null);
      if (indexOfNullSection > -1) {
        this.activeSections.splice(indexOfNullSection, 1);
      }
    },
    addEmptySection(position) {
      this.removeEmptySection();
      if (position !== undefined) {
        this.insertSection({ position: position });
      } else {
        this.insertSection({ position: this.activePosition });
      }
    },
    assignSection(section) {
      const sectionUUID = `bz-page-${
        this.activePage.name
      }-section-${this.$uuid.v4()}`;
      this.activeSections[this.addPosition] = cloneDeep({
        sectionUUID,
        ...section,
      });
      this.updatePages(this.allPages);
    },
    openPageSlider() {
      if (!this.openSlider || this.activeSlider !== "pages") {
        this.enableEdit();
        this.setOpenSlider({ sliderName: "pages" });
      }
    },
    openThemeSlider() {
      this.addPosition = null;
      if (!this.openSlider || this.activeSlider !== "theme") {
        this.disableEdit();
        this.setOpenSlider({ sliderName: "theme" });
        window.document.getElementsByTagName("html")[0].style.overflow = "";
      }
    },
    openSettingSlider(activeTab, activeSubTab) {
      if (!this.openSlider || this.activeSlider !== "settings") {
        this.enableEdit();
        this.setOpenSlider({ sliderName: "settings", activeTab, activeSubTab });
      }
    },
    async saveAllPages() {
      return new Promise((resolve) => {
        this.savingAllPages = true;
        this.save(() => {
          this.savingAllPages = false;
          this.$toast.success("Successfully saved!");
          resolve(true);
        });
      });
    },
    ...mapMutations({
      setOpenSlider: "setOpenSlider",
      closeSlider: "closeSlider",
      setActivePage: "setActivePage",
      updatePages: "updatePages",
      insertSection: "insertSection",
      setActivatePosition: "setActivatePosition",
      enableEdit: "enableEdit",
      disableEdit: "disableEdit",
      setAddPosition: "setAddPosition",
      setViewMode: "setViewMode",
      updateBackground: "updateBackground",
      updateLayout: "updateLayout",
      save: "saveAllPages",
    }),
  },
};
