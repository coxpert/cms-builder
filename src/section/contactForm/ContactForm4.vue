<template>
  <div class="bz-section-container bz-sec--contact-form-4-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container class="col-12">
        <bz-card :background-color="cardBackgroundColor" class="bz-card-root bz-overflow-hidden">
          <div class="col-12 bz-p-0">
            <div class="row" :class="{ 'flex-row-reverse': setting.alignment === 'right' }">
              <div class="col-lg-6 bz-p-lg-6 bz-p-2">
                <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                  <bz-title v-model="data.elements.title" :background-color="cardBackgroundColor" v-if="setting.elements.title" />

                  <bz-subtitle v-model="data.elements.subtitle" :background-color="cardBackgroundColor" v-if="setting.elements.subtitle" />

                  <bz-text v-model="data.elements.description" :background-color="cardBackgroundColor" v-if="setting.elements.description" />
                </bz-alignment>

                <bz-contact-form v-model="data.form">
                  <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                    <bz-form-group
                      :label="data.form.formFields.firstName.label"
                      v-if="data.form.formFields.firstName.enabled"
                      v-model="contact.data.firstName"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.firstName.enabled && !contact.data.firstName && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.lastName.label"
                      v-if="data.form.formFields.lastName.enabled"
                      v-model="contact.data.lastName"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.lastName.enabled && !contact.data.lastName && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.email.label"
                      v-if="data.form.formFields.email.enabled"
                      v-model="contact.data.email"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.email.enabled && !contact.data.email && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.subject.label"
                      v-if="data.form.formFields.subject.enabled"
                      v-model="contact.data.subject"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.subject.enabled && !contact.data.subject && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.phone.label"
                      v-if="data.form.formFields.phone.enabled"
                      v-model="contact.data.phone"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.phone.enabled && !contact.data.phone && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.date.label"
                      v-if="data.form.formFields.date.enabled"
                      v-model="contact.data.date"
                      :background-color="cardBackgroundColor"
                      type="date"
                      placeholder="mm/dd/yyy"
                    />
                    <div class="field-required" v-if="data.form.formFields.date.enabled && !contact.data.date && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.address.label"
                      v-if="data.form.formFields.address.enabled"
                      v-model="contact.data.address"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.address.enabled && !contact.data.address && contact.submitted">This Field is required</div>

                    <bz-form-group
                      :label="data.form.formFields.message.label"
                      v-if="data.form.formFields.message.enabled"
                      v-model="contact.data.message"
                      type="textarea"
                      :background-color="cardBackgroundColor"
                    />
                    <div class="field-required" v-if="data.form.formFields.message.enabled && !contact.data.message && contact.submitted">This Field is required</div>

                    <div class="d-flex w-100">
                      <input type="checkbox" class="m-1" :id="'bz-checkbox-' + section.id" />
                      <label :for="'bz-checkbox-' + section.id">
                        <bz-text v-model="data.form.permissionMessage" :background-color="cardBackgroundColor" />
                      </label>
                    </div>

                    <div class="success-text" v-if="contact.success">
                      <div class="title">{{ data.form.successMessage.title }}</div>
                      <div class="msg">{{ data.form.successMessage.message }}</div>
                    </div>

                    <bz-button @click="handleSubmit" v-model="data.submitButton" :link="false" />
                  </bz-alignment>
                </bz-contact-form>
              </div>
              <div class="col-lg-6 bz-p-0">
                <bz-image v-model="data.elements.image" resize-mode="full" :disable-aspect-view="true" />
              </div>
            </div>
          </div>
        </bz-card>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzContactForm from '../../components/section/BzContactForm'
import BzAlignment from '../../components/section/BzAlignment'
import BzCard from '../../components/section/BzCard'
import BzFormGroup from '../../components/section/BzFormGroup'
import BzText from '../../components/section/BzText'
import BzButton from '../../components/section/BzButton'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzInput from '../../components/page/BzInput'
import BzImage from '../../components/section/BzImage'

export default {
  mixins: [sectionMixin],
  components: {
    BzImage,
    BzInput,
    BzSubtitle,
    BzButton,
    BzText,
    BzFormGroup,
    BzCard,
    BzAlignment,
    BzContactForm,
    BzContainer,
    BzTitle,
    BzBackground
  },
  computed: {
    cardBackgroundColor() {
      return '#ffffff'
    }
  }
}
</script>
<style lang="scss">
.bz-sec--contact-form-4-root {
  .bz-card-root {
    //border-top-left-radius: 1em;
    //border-bottom-left-radius: 1em;
    border-radius: 1em;
    box-shadow: 0 0.25rem 0.5rem -0.125rem #00000012, 0 1rem 1.5rem -0.5rem #00000012 !important;
  }
}
</style>
