
const check = {
    validate(req, res, next) {
        let pass = true;
        const values = req.body;
        const required = ['title', 'description'];
        let errors = {};
        for (let i = 0; i < required.length; i += 1) {
            if (!values[required[i]]) { pass = false; errors[required[i]] = `${required[i]} is required`; }
        }
        if (values.title && !values.title.replace(/\s/g, '').length) {
            errors.title = 'Title can not be blank'; pass = false;
        }
        if (values.description && !values.description.replace(/\s/g, '').length) {
            errors.description = 'Category can not be blank'; pass = false;
        }
        //   if(values.subCategory && !values.subCategory.replace(/\s/g, '').length) {
        //       errors.subCategory = 'Subcategory can not be blank'; pass = false;
        //   }
        //   if(values.content && !values.content.replace(/\s/g, '').length) {
        //       errors.content = 'Content can not be blank'; pass = false;
        //   }
        if (pass === false) {
            res.status(400).json({ error: errors });
        } else {
            req.body.title = req.body.title.trim();
            req.body.description = req.body.description.trim();
            next();
        }
    },
};

export default check;
