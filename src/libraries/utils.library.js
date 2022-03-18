export const extractParam = (req, param) => req.params[param].slice(param.length + 1);

export const isValidTable = name => !!name.match(/^[_A-Za-z]+$/);

export const getIpAddress = req =>  req.ip.split(':').at(-1)