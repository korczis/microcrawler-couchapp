// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function (module) {
    'use strict';

    var App = module.App;

    App.StreamView = Ember.View.extend({
        templateName: "stream/index",

        data: Ember.A([{},{}]),

        /**
         * Called when inserted to DOM.
         * @memberof Application.ApplicationView
         * @instance
         */
        didInsertElement: function () {
            var log = App.logger && App.logger.log  ? App.logger.log : console.log;
            log("App.StreamView.didInsertElement()");

            var path = unescape(document.location.pathname).split('/'),
                design = path[3],
                db = $.couch.db(path[1]);

            var changesRunning = false;
            var self = this;
            var doPolling = function() {
                setTimeout(function() {
                    db.view(design + "/recent-data", {
                        descending : "true",
                        limit : 50,
                        update_seq : true,
                        success : function(data) {
                            var since = data.update_seq;

                            if(!changesRunning) {
                                var changeHandler = db.changes(since);
                                changeHandler.onChange(doPolling);
                                changesRunning = true;
                            }

                            self.set('data', data.rows);
                        }
                    });
                }, 10);
            };
            doPolling();
        }
    });

}(this));