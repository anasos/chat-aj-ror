App = {};

angular.module('storageModule', ['LocalStorageModule']);
angular.module('httpModule', ['storageModule']);