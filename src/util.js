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

    	return this;

	}
]);