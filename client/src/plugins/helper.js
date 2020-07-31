"use strict"
import Vue from 'vue'
const Helper = {
    install(vue) {
        // vue.prototype.appName = 
        vue.prototype.getImage = function (location, name) {
            return process.env.VUE_APP_URL + '/' + location + '/' + name
        }
    }
}

Vue.use(Helper)