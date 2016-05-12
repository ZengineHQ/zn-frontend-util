/**
 * wgnUtil service
 *
 * Useful generic utility methods
 */
plugin.service('wgnUtil', [
	function(){

        /**
         * Service
         *
         * @type {Object}
         */
		var Service = this;

        /**
         * Get a UUID
         *
         * @return {String} UUID
         */
        this.getUUID = function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };

		/**
		 * Shuffle an array (Fisher-Yates Shuffle)
		 *
		 * @param  {array} array to shuffle
		 *
		 * @return {array} shuffled array
		 */
		this.shuffle = function(array) {
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

    	return this;

	}
]);