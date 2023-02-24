const db = require('../config/db.js')

class Property {

static async createProperty(property,img,user_id)
{
    const image = img;
    const imageEncoded = Buffer.from(image).toString('hex')

    await db.query(`INSERT INTO properties (title, location, rating, price, type, img, details, admin_id) VALUES ('${property.title}', '${property.location}', '${property.rating}', '${property.price}', '${property.type}', '${imageEncoded}', '${property.details}', '${user_id}')`);

}


static async getAllProperties()
{

    const results = await db.query(`SELECT property_id, title, location, rating, price, type, img, details, admin_id FROM properties`)
    
    if (results.rows.length > 0) {
        const properties = [];

        for (const row of results.rows) {
          const imageEncoded = row.img;
          const image = Buffer.from(imageEncoded, 'hex');
          const property = {
            property_id: row.property_id,
            title: row.title,
            location: row.location,
            rating: row.rating,
            price: row.price,
            type: row.type,
            img: image,
            details: row.details,
            admin_id: row.admin_id
          };
          properties.push(property);
        }
        
        return properties;
        //res.send(image);
    }

    //return results.rows;

}


static async getProperty(id)
{

    const results = await db.query(`SELECT property_id, title, location, rating, price, type, img, details, admin_id FROM properties WHERE property_id = '${id}'`)
    return results.rows[0];
}


static async updateProperty(property_form_data,id)
{
    await db.query(`UPDATE properties SET title = '${property_form_data.title}',
    location = '${property_form_data.location}',
    rating = '${property_form_data.rating}',
    price = '${property_form_data.price}',
    type = '${property_form_data.type}',
    img = '${property_form_data.img}',
    details = '${property_form_data.details}'
    WHERE property_id = '${id}'`);
}


static async deleteProperty(id)
{
    await db.query (`DELETE FROM property WHERE property_id='${id}'`);
}


}



module.exports = Property;