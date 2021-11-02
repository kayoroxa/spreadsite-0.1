import pageSettings, { PageSettingsModel } from './pageSettings'

export interface StoreModel {
  pageSettings: PageSettingsModel
}

const model: StoreModel = {
  pageSettings,
}

export default model
