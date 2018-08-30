const check = {
    validateQuestions(req, res, next) {
        let pass = true;
        const values = req.body;
        const required = ['title', 'description'];
        let errors = {};
        for (let i = 0; i < required.length; i += 1) {
            if (!values[required[i]]) { pass = false; errors[required[i]] = `${required[i]} is required`; }
        }
        if (values.title && !values.title.replace(/\s/g, '').length) {
            errors.title = 'Title can not be left blank'; pass = false;
        }
        if (values.description && !values.description.replace(/\s/g, '').length) {
            errors.description = 'Question description can not be left blank'; pass = false;
        }
        if(pass === false) {
            return res.status(400).json({ error: errors });
        } else {
            req.body.title = req.body.title.trim();
            req.body.description = req.body.description.trim();
            next();
        }
    },
    validateAnswers(req, res, next) {
        let pass = true;
        const values = req.body;
        const required = ['answer'];
        let errors = {};
        for (let i = 0; i < required.length; i += 1) {
            if (!values[required[i]]) { 
                pass = false; 
                errors[required[i]] = `${required[i]} is required`; }
        }
        if (values.title && !values.title.replace(/\s/g, '').length) {
            errors.title = 'Quesstion title can not be blank'; pass = false;
        }
        if (values.answer && !values.answer.replace(/\s/g, '').length) {
            errors.description = 'Answer description can not be blank';
            pass = false;
        }
        if (pass === false) {
            return res.status(400).json({ error: errors });
        } else {
            req.body.answer = req.body.answer.trim();
            next();
        }
    },
};

export default check;
