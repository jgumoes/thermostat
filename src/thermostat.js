'use strict';

class Thermostat{
  constructor() {
    this.DEFAULT_TEMPERATURE = 20;
    this.temperature = this.DEFAULT_TEMPERATURE;
    this.MINIMUM_TEMPERATURE = 10;
    this.powerSavingMode = true;
    this.MAX_LIMIT_PSM_ON = 25;
    this.MAX_LIMIT_PSM_OFF = 32;
    this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
    this.HIGH_ENERGY_USAGE_LIMIT = 25;
  }
  getCurrentTemperature() {
    return this.temperature;
  }

  up() {
    if (this._isMaximumTemperature()) {
      return false;
    }
    this.temperature += 1;
    return true;
  }

  down() {
    if (this._isMinimumTemperature()) {
      return false;
    }
    this.temperature -= 1;
    return true;
  }

  isPowerSavingModeOn(){
    return this.powerSavingMode === true;
  }

  switchPowerSavingModeOff() {
    this.powerSavingMode = false;
  }

  switchPowerSavingModeOn() {
    this.powerSavingMode = true;
    if (this.temperature > this.MAX_LIMIT_PSM_ON){
      this.temperature = this.MAX_LIMIT_PSM_ON
    };
  }

  resetTemperature() {
    this.temperature = this.DEFAULT_TEMPERATURE;
  }

  energyUsage() {
    if (this.temperature > this.HIGH_ENERGY_USAGE_LIMIT){
      return 'high-usage';
    }
    if (this.temperature > this.MEDIUM_ENERGY_USAGE_LIMIT){
      return 'medium-usage';
    }
    return 'low-usage';
  }

  _isMinimumTemperature() {
    return this.temperature === this.MINIMUM_TEMPERATURE;
  }

  _isMaximumTemperature() {
    if (this.isPowerSavingModeOn() === false) {
      return this.temperature >= this.MAX_LIMIT_PSM_OFF;
    }
    return this.temperature >= this.MAX_LIMIT_PSM_ON;
  }

};