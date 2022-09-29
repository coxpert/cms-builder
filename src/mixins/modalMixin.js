export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.data = this.$store.state.modals.basic.data || {};
    this.$modal.show(this.$store.state.modals.basic.name);
  },
  methods: {
    onClose() {
      this.$store.commit("closeModal");
    },
    onConfirm() {
      this.$store.state.modals.basic.onChange(this.data);
      this.onClose();
    },
  },
};
