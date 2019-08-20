/**
 * wgnUtil service
 *
 * Useful generic utility methods
 */
plugin.service('wgnUtil', [ function() {

    var srv = this;

    /**
     * Get a UUID
     *
     * @return {String} UUID
     */
    srv.getUUID = function() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
       function(c) { return parseInt(Math.random() * 16).toString(16); });
    };

    /**
     * Shuffle an array (Fisher-Yates Shuffle)
     *
     * @param  {array} array to shuffle
     *
     * @return {array} shuffled array
     */
    srv.shuffle = function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    /**
     * Parse query string into object
     *
     * @param  {String} query string
     *
     * @return {Object} params
     */
    srv.parseQueryString = function(keyValue) {

      var obj = {},
        key_value,
        key;

            var params = (keyValue || "").split('&');

      params.forEach(function(keyValue) {
        if (keyValue) {
          key_value = keyValue.split('=');
          key = decodeURIComponent(key_value[0]);
          obj[key] = key_value[1] !== undefined ?
            decodeURIComponent(key_value[1]) : true;
        }
      });

      return obj;
    };

    /**
      * Decode an encoded value.
      *
      * @private
      * @param {string} value The value to be decoded.
      *
      * @return {string} The decoded value.
      */
    var _decode = function _decode(value) {
      var escapes, keys, reg;

      escapes = {
        '\\*dollar\\*': '$',
        '\\*forward-slash\\*': '/',
        '\\*left-bracket\\*': '[',
        '\\*right-bracket\\*': ']',
        '\\*number\\*': '#',
        '\\*period\\*': '.'
      };

      keys = Object.keys(escapes);

      keys.forEach(function(exp) {
        reg = new RegExp(exp, 'g');
        value = value.replace ? value.replace(reg, escapes[exp]) : value;
      });

      return value;
    };

    /**
      * Encode a value.
      *
      * @private
      * @param {string} value The value to be encoded.
      *
      * @return {string} The encoded value.
      */
    var _encode = function _encode(value) {
      var escapes, keys, reg;

      escapes = {
        '\\$': '*dollar*',
        '\\/': '*forward-slash*',
        '\\[': '*left-bracket*',
        '\\]': '*right-bracket*',
        '\\#': '*number*',
        '\\.': '*period*',
      };

      keys = Object.keys(escapes);

      keys.forEach(function(exp) {
        reg = new RegExp(exp, 'g');
        value = value.replace ? value.replace(reg, escapes[exp]) : value;
      });

      return value;
    };

    /**
    * Format one, or multiple, values.
    *
    * @param {Array | Object | string} items The item(s) to be formatted.
    * @param {boolean} parse A flag to indicate decoding or encoding;
    * true to decode, false to encode.
    * @param {Array} whitelist Items to be excluded from the formatting
    * process
    * @return {Object} The modified settings.
    */
    srv.format = function format(items, parse, whitelist) {
      var formatter, keys, tmpKey;

      formatter = parse ? _decode : _encode;

      whitelist = whitelist || [];

      if (Array.isArray(items)) {

        items.forEach(function(item, index) {
          items[index] = format(item, parse, whitelist);
        });

      } else if (typeof items === 'object') {

        keys = Object.keys(items);

        keys.forEach(function(key) {

          if (items.hasOwnProperty(key)) {

            tmpKey = format(key, parse, whitelist);
            items[tmpKey] = format(items[key], parse, whitelist);
            delete items[key];

          }

        });

      } else if (whitelist.indexOf(items) === -1) {

        items = formatter(items);

      }

      return items;
    };

    /**
     * Convert a string to camel case.
     *
     * @public
     * @param {string} str The string to be converted to camel case
     * @returns {*} The non-string value or the converted string
     */
    srv.camelCase = function camelCase(str) {

      if (typeof str !== 'string') { return str; }

      return str
        .replace(/(^[A-Z])|(\s[a-zA-Z])|(\s)/g,
          function(value, capture1, capture2, capture3) {

            if (capture1) { return capture1.toLowerCase(); }

            if (capture2) { return capture2.trim(' ').toUpperCase(); }

            if (capture3) { return capture3.trim(' '); }

            return value;

          }
        );

    };

    /**
     * Verify a trailing slash and add if needed.
     *
     * @public
     * @param {string} url The string to verify and append a trailing slash
     * @returns {*} The non-string value or the verified/modified string
     */
    srv.trailingSlash = function trailingSlash(url) {

      if (typeof url !== 'string') { return url; }

      return url.substring(url.length - 1, url.length) !== '/' ?
        url.concat('/') : url;

    };

    return srv;

  }
]);
