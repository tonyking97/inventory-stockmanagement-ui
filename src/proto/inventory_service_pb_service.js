// package: inventory
// file: inventory_service.proto

var inventory_service_pb = require("./inventory_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var InventoryService = (function () {
  function InventoryService() {}
  InventoryService.serviceName = "inventory.InventoryService";
  return InventoryService;
}());

InventoryService.Ping = {
  methodName: "Ping",
  service: InventoryService,
  requestStream: false,
  responseStream: false,
  requestType: inventory_service_pb.PingRequest,
  responseType: inventory_service_pb.PingResponse
};

InventoryService.AddCategory = {
  methodName: "AddCategory",
  service: InventoryService,
  requestStream: false,
  responseStream: false,
  requestType: inventory_service_pb.AddCategoryRequest,
  responseType: inventory_service_pb.AddCategoryResponse
};

InventoryService.GetCategory = {
  methodName: "GetCategory",
  service: InventoryService,
  requestStream: false,
  responseStream: false,
  requestType: inventory_service_pb.GetCategoryRequest,
  responseType: inventory_service_pb.GetCategoryResponse
};

exports.InventoryService = InventoryService;

function InventoryServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

InventoryServiceClient.prototype.ping = function ping(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(InventoryService.Ping, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

InventoryServiceClient.prototype.addCategory = function addCategory(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(InventoryService.AddCategory, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

InventoryServiceClient.prototype.getCategory = function getCategory(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(InventoryService.GetCategory, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.InventoryServiceClient = InventoryServiceClient;

