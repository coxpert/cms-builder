<template>
  <div class="bz-section-container bz-sec--contact-form-8-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <div class="bz-col-12">
          <div class="bz-row" :class="{ 'bz-row-reverse': setting.alignment === 'right' }">
            <div class="bz-col-lg-4 bz-py-3">
              <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                <bz-title v-model="data.elements.title" v-if="setting.elements.title" />

                <bz-subtitle v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

                <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
              </bz-alignment>
            </div>
            <div class="bz-col-lg-8 bz-d-flex bz-column">
              <bz-contact-form v-model="data.form">
                <bz-alignment class="bz-pr-lg-3" :alignment="setting.layouts.alignment" :stretch="false">
                  <div class="bz-col-12">
                    <div class="bz-row">
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group :label="data.form.formFields.firstName.label" v-if="data.form.formFields.firstName.enabled" v-model="contact.data.firstName" />
                        <div class="field-required" v-if="data.form.formFields.firstName.enabled && !contact.data.firstName && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group :label="data.form.formFields.lastName.label" v-if="data.form.formFields.lastName.enabled" v-model="contact.data.lastName" />
                        <div class="field-required" v-if="data.form.formFields.lastName.enabled && !contact.data.lastName && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group :label="data.form.formFields.email.label" v-if="data.form.formFields.email.enabled" v-model="contact.data.email" />
                        <div class="field-required" v-if="data.form.formFields.email.enabled && !contact.data.email && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group :label="data.form.formFields.subject.label" v-if="data.form.formFields.subject.enabled" v-model="contact.data.subject" />
                        <div class="field-required" v-if="data.form.formFields.subject.enabled && !contact.data.subject && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group :label="data.form.formFields.phone.label" v-if="data.form.formFields.phone.enabled" v-model="contact.data.phone" />
                        <div class="field-required" v-if="data.form.formFields.phone.enabled && !contact.data.phone && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group
                          :label="data.form.formFields.date.label"
                          v-if="data.form.formFields.date.enabled"
                          v-model="contact.data.date"
                          type="date"
                          placeholder="mm/dd/yyy"
                        />
                        <div class="field-required" v-if="data.form.formFields.date.enabled && !contact.data.date && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-lg-6 bz-py-0">
                        <bz-form-group :label="data.form.formFields.address.label" v-if="data.form.formFields.address.enabled" v-model="contact.data.address" />
                        <div class="field-required" v-if="data.form.formFields.address.enabled && !contact.data.address && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-12 bz-py-0">
                        <bz-form-group :label="data.form.formFields.message.label" v-if="data.form.formFields.message.enabled" v-model="contact.data.message" type="textarea" />
                        <div class="field-required" v-if="data.form.formFields.message.enabled && !contact.data.message && contact.submitted">This Field is required</div>
                      </div>
                      <div class="bz-col-12 bz-d-flex bz-py-0">
                        <input type="checkbox" class="m-1" :id="'bz-checkbox-' + section.id" />
                        <label :for="'bz-checkbox-' + section.id">
                          <bz-text v-model="data.form.permissionMessage" />
                        </label>
                      </div>
                    </div>
                  </div>
                </bz-alignment>
              </bz-contact-form>

              <div class="success-text" v-if="contact.success">
                <div class="title">{{ data.form.successMessage.title }}</div>
                <div class="msg">{{ data.form.successMessage.message }}</div>
              </div>

              <div class="bz-col-12">
                <bz-alignment :alignment="setting.layouts.alignment" :stretch="false">
                  <bz-button @click="handleSubmit" v-model="data.submitButton" :link="false" />
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
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzDivider from '../../components/section/BzDivider'
import BzText from '../../components/section/BzText'
import BzButton from '../../components/section/BzButton'
import BzFormGroup from '../../components/section/BzFormGroup'
import BzAlignment from '../../components/section/BzAlignment'
import BzContainer from '../../components/section/BzContainer'
import BzContactForm from '../../components/section/BzContactForm'

export default {
  mixins: [sectionMixin],
  components: {
    BzSubtitle,
    BzDivider,
    BzText,
    BzButton,
    BzFormGroup,
    BzAlignment,
    BzContainer,
    BzContactForm,
    BzTitle,
    BzBackground
  }
}
</script>
<style lang="scss">
.bz-sec--contact-form-8-root {
  .bz-form-item {
    border: solid 1px #8080803f !important;
    background-color: #ffffff9f !important;
    border-radius: 0.25em;
  }
}
</style>
