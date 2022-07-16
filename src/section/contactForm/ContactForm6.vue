<template>
  <div class="bz-section-container bz-sec--contact-form-6-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :background-color="theme.secondaryColor" :setting="background">
      <div class="bz-col-12">
        <div class="bz-row">
          <div class="bz-col-lg-4">
            <bz-card :background-color="whiteCardBackgroundColor">
              <bz-section-size :size="sectionSize">
                <bz-address :location="setting.businessInformation.location" v-if="setting.elements.address" :background-color="whiteCardBackgroundColor" />

                <bz-divider />

                <bz-phone-number :location="setting.businessInformation.location" :background-color="whiteCardBackgroundColor" />

                <bz-divider />

                <bz-email :location="setting.businessInformation.location" v-if="setting.elements.email" :background-color="whiteCardBackgroundColor" />
              </bz-section-size>
            </bz-card>
          </div>
          <div class="bz-col-lg-8">
            <bz-card :background-color="primaryCardBackgroundColor">
              <bz-section-size :size="sectionSize">
                <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                  <bz-title v-model="data.elements.title" :background-color="primaryCardBackgroundColor" v-if="setting.elements.title" />

                  <bz-subtitle v-model="data.elements.subtitle" :background-color="primaryCardBackgroundColor" v-if="setting.elements.subtitle" />

                  <bz-text v-model="data.elements.description" :background-color="primaryCardBackgroundColor" v-if="setting.elements.description" />
                </bz-alignment>

                <bz-contact-form v-model="data.form">
                  <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                    <bz-form-group
                      :label="data.form.formFields.firstName.label"
                      v-if="data.form.formFields.firstName.enabled"
                      v-model="contact.data.firstName"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.firstName.enabled && !contact.data.firstName && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.lastName.label"
                      v-if="data.form.formFields.lastName.enabled"
                      v-model="contact.data.lastName"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.lastName.enabled && !contact.data.lastName && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.email.label"
                      v-if="data.form.formFields.email.enabled"
                      v-model="contact.data.email"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.email.enabled && !contact.data.email && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.subject.label"
                      v-if="data.form.formFields.subject.enabled"
                      v-model="contact.data.subject"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.subject.enabled && !contact.data.subject && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.phone.label"
                      v-if="data.form.formFields.phone.enabled"
                      v-model="contact.data.phone"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.phone.enabled && !contact.data.phone && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.date.label"
                      v-if="data.form.formFields.date.enabled"
                      v-model="contact.data.date"
                      :background-color="primaryCardBackgroundColor"
                      type="date"
                      placeholder="mm/dd/yyy"
                    />
                    <div class="field-required" v-if="data.form.formFields.date.enabled && !contact.data.date && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.address.label"
                      v-if="data.form.formFields.address.enabled"
                      v-model="contact.data.address"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.address.enabled && !contact.data.address && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.message.label"
                      v-if="data.form.formFields.message.enabled"
                      v-model="contact.data.message"
                      type="textarea"
                      :background-color="primaryCardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.message.enabled && !contact.data.message && contact.submitted">This Field is required</div>

                    <div class="d-flex w-100">
                      <input type="checkbox" class="m-1" :id="'bz-checkbox-' + section.id" />
                      <label :for="'bz-checkbox-' + section.id">
                        <bz-text v-model="data.form.permissionMessage" :background-color="primaryCardBackgroundColor" />
                      </label>
                    </div>

                    <div class="success-text" v-if="contact.success">
                      <div class="title">{{ data.form.successMessage.title }}</div>
                      <div class="msg">{{ data.form.successMessage.message }}</div>
                    </div>
                    <bz-button @click="handleSubmit" v-model="data.submitButton" :link="false" />
                  </bz-alignment>
                </bz-contact-form>
              </bz-section-size>
            </bz-card>
          </div>
        </div>
      </div>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzCard from '../../components/section/BzCard'
import BzAddress from '../../components/section/BzAddress'
import BzPhoneNumber from '../../components/section/BzPhoneNumber'
import BzEmail from '../../components/section/BzEmail'
import BzDivider from '../../components/section/BzDivider'
import BzSectionSize from '../../components/section/BzSectionSize'
import BzAlignment from '../../components/section/BzAlignment'
import BzContactForm from '../../components/section/BzContactForm'
import BzFormGroup from '../../components/section/BzFormGroup'
import BzButton from '../../components/section/BzButton'
import BzText from '../../components/section/BzText'

export default {
  mixins: [sectionMixin],
  components: {
    BzText,
    BzButton,
    BzFormGroup,
    BzContactForm,
    BzAlignment,
    BzSectionSize,
    BzDivider,
    BzEmail,
    BzPhoneNumber,
    BzAddress,
    BzCard,
    BzTitle,
    BzBackground
  },
  computed: {
    whiteCardBackgroundColor() {
      return '#ffffff'
    },
    primaryCardBackgroundColor() {
      return this.theme.primaryColor
    }
  }
}
</script>
<style lang="scss">
.bz-sec--contact-form-6-root {
  .bz-form-item {
    border: none !important;
    border-radius: 0.2em !important;
    background-color: white !important;
  }
}
</style>
