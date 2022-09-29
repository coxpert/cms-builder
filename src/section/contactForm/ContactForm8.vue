<template>
  <div
    class="bz-section-container bz-sec--contact-form-8-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div class="bz-col-12">
          <div
            class="bz-row"
            :class="{ 'bz-row-reverse': setting.alignment === 'right' }"
          >
            <div class="bz-col-lg-4 bz-py-3">
              <bz-alignment
                :alignment="setting.layouts.alignment"
                :stretch="false"
              >
                <bz-title
                  v-if="setting.elements.title"
                  v-model="data.elements.title"
                />

                <bz-subtitle
                  v-if="setting.elements.subtitle"
                  v-model="data.elements.subtitle"
                />

                <bz-text
                  v-if="setting.elements.description"
                  v-model="data.elements.description"
                />
              </bz-alignment>
            </div>
            <div class="bz-col-lg-8 bz-d-flex bz-column">
              <bz-contact-form v-model="data.form">
                <bz-alignment
                  class="bz-pr-lg-3"
                  :alignment="setting.layouts.alignment"
                  :stretch="false"
                >
                  <div class="bz-col-12">
                    <div class="bz-row">
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.firstName.enabled"
                          v-model="contact.data.firstName"
                          :label="data.form.formFields.firstName.label"
                        />
                        <div
                          v-if="
                            data.form.formFields.firstName.enabled &&
                            !contact.data.firstName &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.lastName.enabled"
                          v-model="contact.data.lastName"
                          :label="data.form.formFields.lastName.label"
                        />
                        <div
                          v-if="
                            data.form.formFields.lastName.enabled &&
                            !contact.data.lastName &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.email.enabled"
                          v-model="contact.data.email"
                          :label="data.form.formFields.email.label"
                        />
                        <div
                          v-if="
                            data.form.formFields.email.enabled &&
                            !contact.data.email &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.subject.enabled"
                          v-model="contact.data.subject"
                          :label="data.form.formFields.subject.label"
                        />
                        <div
                          v-if="
                            data.form.formFields.subject.enabled &&
                            !contact.data.subject &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.phone.enabled"
                          v-model="contact.data.phone"
                          :label="data.form.formFields.phone.label"
                        />
                        <div
                          v-if="
                            data.form.formFields.phone.enabled &&
                            !contact.data.phone &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.date.enabled"
                          v-model="contact.data.date"
                          :label="data.form.formFields.date.label"
                          type="date"
                          placeholder="mm/dd/yyy"
                        />
                        <div
                          v-if="
                            data.form.formFields.date.enabled &&
                            !contact.data.date &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.address.enabled"
                          v-model="contact.data.address"
                          :label="data.form.formFields.address.label"
                        />
                        <div
                          v-if="
                            data.form.formFields.address.enabled &&
                            !contact.data.address &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-12 bz-py-0">
                        <bz-form-group
                          v-if="data.form.formFields.message.enabled"
                          v-model="contact.data.message"
                          :label="data.form.formFields.message.label"
                          type="textarea"
                        />
                        <div
                          v-if="
                            data.form.formFields.message.enabled &&
                            !contact.data.message &&
                            contact.submitted
                          "
                          class="field-required"
                        >
                          This Field is required
                        </div>
                      </div>
                      <div class="bz-col-12 bz-d-flex bz-py-0">
                        <input
                          :id="'bz-checkbox-' + section.id"
                          type="checkbox"
                          class="m-1"
                        />
                        <label :for="'bz-checkbox-' + section.id">
                          <bz-text v-model="data.form.permissionMessage" />
                        </label>
                      </div>
                    </div>
                  </div>
                </bz-alignment>
              </bz-contact-form>

              <div v-if="contact.success" class="success-text">
                <div class="title">{{ data.form.successMessage.title }}</div>
                <div class="msg">{{ data.form.successMessage.message }}</div>
              </div>

              <div class="bz-col-12">
                <bz-alignment
                  :alignment="setting.layouts.alignment"
                  :stretch="false"
                >
                  <bz-button
                    v-model="data.submitButton"
                    :link="false"
                    :class="{ loader: loading }"
                    @click="handleSubmit"
                  />
                </bz-alignment>
              </div>
            </div>
          </div>
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzButton from "../../components/section/BzButton";
import BzFormGroup from "../../components/section/BzFormGroup";
import BzAlignment from "../../components/section/BzAlignment";
import BzContainer from "../../components/section/BzContainer";
import BzContactForm from "../../components/section/BzContactForm";
import BaseContactForm from "./BaseContactForm";

export default {
  components: {
    BzSubtitle,
    BzText,
    BzButton,
    BzFormGroup,
    BzAlignment,
    BzContainer,
    BzContactForm,
    BzTitle,
    BzBackground,
  },
  extends: BaseContactForm,
  mixins: [sectionMixin],
};
</script>
<style lang="scss">
.bz-sec--contact-form-8-root {
  @import "styles";
  .bz-form-item {
    border: solid 1px #8080803f !important;
    background-color: #ffffff9f !important;
    border-radius: 0.25em;
  }
}
</style>
