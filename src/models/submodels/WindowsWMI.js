import wmi from "node-wmi";
export const getInfo = async (params = {}) => {
    const { className, callback = (x) => x, where = '' } = params
    try {
        wmi.Query()
        .class( className )
        .where(where)
        .exec( ( err , data) => {
            if( err ) throw err
            callback( data )
        })
    } catch (error) {
        throw error
    }
}