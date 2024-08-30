const path = require('node:path')
const fs = require('node:fs/promises')

const surveysFilePath = path.join(__dirname, '../data/surveys.json')

const getAllSurveys = async (req, res) => {
    try {
        const data = await fs.readFile(surveysFilePath, { encoding: 'utf8' });
        const surveys = JSON.parse(data);
        res.json(surveys);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading surveys file' });
    }
}

const postSurveys = async (req, res) => {
    try {
        const { question, options } = req.body;
        if (!question ||!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ error: 'Question and at least two options are required' });
        }
        const data = await fs.readFile(surveysFilePath, { encoding: 'utf8' });
        const surveys = JSON.parse(data);

        const lastSurvey = surveys[surveys.length - 1];
        const newId = lastSurvey? lastSurvey.id + 1 : 1;
        const newSurvey = { id: newId, question, options };

        surveys.push(newSurvey);
        await fs.writeFile(surveysFilePath, JSON.stringify(surveys, null, 2));

        res.status(201).json(newSurvey);
}
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving survey' });
    }
}

const putSurvey = async (req, res) => {
    try {
        const surveyId = Number.parseInt(req.params.id);
        if (!surveyId) {
            return res.status(400).json({ error: 'Survey ID is required and must be a number' });
        }

        const data = await fs.readFile(surveysFilePath, { encoding: 'utf8' });
        const surveys = JSON.parse(data);

        const surveyIndex = surveys.findIndex(s => s.id === surveyId);

        if (surveyIndex === -1) {
            return res.status(404).json({ error: 'Survey not found' });
        }

        const { question, options, removeOptions } = req.body;
        if (question) {
            surveys[surveyIndex].question = question;
        }
        if (options && Array.isArray(options)) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            options.forEach(optionUpdate => {
                const optionIndex = surveys[surveyIndex].options.findIndex(o => o.option === optionUpdate.option);
                if (optionIndex !== -1) {
                    surveys[surveyIndex].options[optionIndex] = {
                        ...surveys[surveyIndex].options[optionIndex],
                        ...optionUpdate
                    };
                } else {
                    surveys[surveyIndex].options.push(optionUpdate);
                }
            });
        }
        if (removeOptions && Array.isArray(removeOptions)) {
            surveys[surveyIndex].options = surveys[surveyIndex].options.filter(
                o => !removeOptions.includes(o.option)
            );
        }

        await fs.writeFile(surveysFilePath, JSON.stringify(surveys, null, 2), { encoding: 'utf8' });
        return res.json(surveys[surveyIndex]);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error updating survey' });
    }
};
const deleteSurveys = async (req, res) => {
    try {
        const deleteId = Number.parseInt(req.params.id);
        if (!deleteId) {
            return res.status(400).json({ error: 'Comment ID is required' });
        }
        const data = await fs.readFile(surveysFilePath, { encoding: 'utf8'});
        const surveys = JSON.parse(data);
        const updatedSurveys = surveys.filter(s => s.id!== deleteId);
        res.json(updatedSurveys)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting survey' })
    }
}

module.exports = {getAllSurveys, postSurveys, putSurvey, deleteSurveys}