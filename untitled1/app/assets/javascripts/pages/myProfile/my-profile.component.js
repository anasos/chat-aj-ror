angular.
module('myProfile').
component('myProfile', {
    templateUrl: 'pages/myProfile/my-profile.template.html',
    controller: ['$location','$scope', '$rootScope', '$timeout', 'storageService',
        function MyProfileController($location , $scope , $rootScope, $timeout, localStorage) {
            $scope.$user = localStorage.getUser();

            $scope.updateProfile = function updateProfile(file){
                var myprofile = $scope.myProfile;
                debugger;
            },
                $scope.updateProfilere = function updateProfilere(){
                var myprofile = $scope.myProfile;
                debugger;
            }

            $scope.uploadFiler = function(files) {
                var fd = new FormData();
                var self = this;
                debugger;
                //Take the first selected file
                fd.append("file", files[0]);
                self.uploadFile(fd);
            };

            $scope.uploadFile = function uploadFile(file){
                var cloudName = 'dml89sfla';
                var url = "https://api.cloudinary.com/v1_1/"+cloudName+"/upload";
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                // Reset the upload progress bar
                // document.getElementById('progress').style.width = 0;

                // Update progress (can be used to show progress indicator)
                xhr.upload.addEventListener("progress", function(e) {
                    // var progress = Math.round((e.loaded * 100.0) / e.total);
                    // document.getElementById('progress').style.width = progress + "%";

                });

                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // File uploaded successfully
                        var response = JSON.parse(xhr.responseText);
                        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                        var url = response.secure_url;
                        // Create a thumbnail of the uploaded image, with 150px width
                        var tokens = url.split('/');
                        tokens.splice(-2, 0, 'w_150,c_scale');
                        var img = new Image(); // HTML5 Constructor
                        img.src = tokens.join('/');
                        img.alt = response.public_id;
                        //document.getElementById('gallery').appendChild(img);
                    }
                };

                fd.append('upload_preset', unsignedUploadPreset);
                fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
                fd.append('file', file);
                xhr.send(fd);
            }

            $scope.handleFiles = function handleFiles(files) {
                for (var i = 0; i < files.length; i++) {
                    uploadFile(files[i]); // call the function to upload the file
                }
            };

        }]
});