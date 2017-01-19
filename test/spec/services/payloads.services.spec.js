'use strict';

describe("Payload Unit Tests", function() {

  beforeEach(module('myApp'));

  var $httpBackend;
  var Payload;

  beforeEach(inject(function($injector, _Payload_) {

    Payload = _Payload_;
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', 'http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads')
      .respond(200, [{}]);

    $httpBackend.when('GET', 'http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads/456')
      .respond(200, {});

    $httpBackend.when('DELETE', 'http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads/456')
      .respond(200, {});

    $httpBackend.when('POST', 'http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads')
      .respond(200, {});

    $httpBackend.whenGET('/translations/en_GB.json').respond("");
   }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have sent a GET request to the payloads query API', function() {
    var result = Payload.query({box_id: 123, location_id: 'abc'})
    $httpBackend.expectGET('http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads')
    $httpBackend.flush();
  });

  it('should have sent a GET request to the payloads get API', function() {
    var result = Payload.get({box_id: 123, location_id: 'abc', id: 456})
    $httpBackend.expectGET('http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads/456')
    $httpBackend.flush();
  });

  it('should have sent a delete request to the payloads get API', function() {
    var result = Payload.destroy({location_id: 'abc', box_id: 123, id: 456})
    $httpBackend.expectDELETE('http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads/456')
    $httpBackend.flush();
  });

  it('should have sent a post req to create a payload', function() {
    var result = Payload.create({location_id: 'abc', box_id: 123})
    $httpBackend.expectPOST('http://mywifi.dev:8080/api/v1/locations/abc/boxes/123/payloads')
    $httpBackend.flush();
  });
})

describe("Location Payload Unit Tests", function() {

  beforeEach(module('myApp'));

  var $httpBackend;
  var LocationPayload;

  beforeEach(inject(function($injector, _LocationPayload_) {

    LocationPayload = _LocationPayload_;
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('POST', 'http://mywifi.dev:8080/api/v1/locations/abc/payloads')
      .respond(200, {});

    $httpBackend.whenGET('/translations/en_GB.json').respond("");
   }));

  afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have sent a GET request to the payloads query API', function() {
    var result = LocationPayload.create({box_id: 123, location_id: 'abc'})
    $httpBackend.expectPOST('http://mywifi.dev:8080/api/v1/locations/abc/payloads')
    $httpBackend.flush();
  });
})
