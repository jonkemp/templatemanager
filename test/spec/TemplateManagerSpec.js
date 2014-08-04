/* global $, jasmine, describe, it, expect, beforeEach, spyOn, TemplateManager */
'use strict';

describe('TemplateManager', function() {
    var fixture = './fixture/hello.html';

    beforeEach(function() {
        this.ajax = spyOn($, 'ajax');

        this.templateManager = new TemplateManager();
    });

    it('should be defined', function() {
        expect(this.templateManager).toBeDefined();
    });

    it('should have a template method', function() {
        expect(this.templateManager.template).toBeDefined();
    });

    it('should be able to get a template and populate it with data', function(done) {
        this.ajax.and.callThrough();

        expect($.ajax.calls.count()).toEqual(0);

        this.templateManager.template(fixture)
            .done(function (data) {
                var template = data({name: 'Jonathan'});
                expect($.trim(template)).toEqual('<h1>Hello Jonathan!</h1>');
                expect($.ajax.calls.count()).toEqual(1);
                done();
            });
    });

    it('should cache the template and only request it once', function(done) {
        var self = this;

        self.ajax.and.callThrough();

        expect($.ajax.calls.count()).toEqual(0);

        self.templateManager.template(fixture)
            .done(function () {

                self.templateManager.template(fixture)
                    .done(function () {
                        expect($.ajax.calls.count()).toEqual(1);
                        done();
                    });
            });
    });

    it('should reject the promise if the call fails', function(done) {
        var onSuccess = jasmine.createSpy(),
            onError = jasmine.createSpy();

        this.ajax.and.callFake( function (params) {
            params.error({ status: 500 });
        });

        var template = this.templateManager.template(fixture)
            .done(function () {
                onSuccess();
            })
            .fail(function (data) {
                onError();
            });

        $.when( template ).always(function (response) {
            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            done();
        });
    });
});
