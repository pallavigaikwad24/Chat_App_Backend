/**
 * @param {Object} modelName
 * @param {Object} arguments
 * @param {String} methodType
 * @returns {Promise<Object>}
 */


const getModelInfo = async ({ modelName, methodType, args }) => {
  if (Array.isArray(args)) {
    args[1]['returning'] = true;
    args && args.where ? args[1].where['is_deleted'] = false : '';
    return await modelName[methodType](...args);
  } else if (args == undefined) {
    return await modelName[methodType]();
  } else {
    if (methodType != 'create' || methodType != 'findOrCreate' || !args?.where?.is_deleted) {
      args && args.where ? args.where['is_deleted'] = false : '';
    }
    return await modelName[methodType](args);
  }
};

module.exports = getModelInfo;
