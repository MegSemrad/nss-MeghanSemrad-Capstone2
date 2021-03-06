import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../providers/LanguageProvider.js";
import { LanguageProficiencyContext } from "../../providers/LanguageProficiencyProvider";
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Container, Form, FormGroup, Input, Label } from 'reactstrap';


const LanguageEdit = () => {
    const { languageId } = useParams();
    const history = useHistory();
    const { getLanguageById, editLanguage } = useContext(LanguageContext);
    const { getLanguageProficiencies } = useContext(LanguageProficiencyContext)


    const [language, setLanguage] = useState({});
    const [languageProficiencies, setLanguageProficiencies] = useState([]);


    useEffect(() => {
        getLanguageById(languageId)
            .then((languageObject) => {
                setLanguage(languageObject)
            })
            .then(() => {
                getLanguageProficiencies()
                    .then(resp => setLanguageProficiencies(resp))
            })
    }, []);


    const handleControlledInputChange = (event) => {
        const newLanguage = { ...language }
        newLanguage[event.target.id] = event.target.value
        setLanguage(newLanguage)
    };


    const handleClickSaveLanguage = () => {
        editLanguage({
            id: languageId,
            languageName: language.languageName,
            languageProficiencyId: language.languageProficiencyId
        })
            .then(() => history.push("/"))
    };


    return (
        <Container className="editLanguageContainer">
            <Card>
                <Form>
                    <FormGroup className="editLanguageForm">
                        <Label for="examplePassword">Language</Label>
                        <Input type="text"
                            id="languageName"
                            value={language.languageName}
                            onChange={handleControlledInputChange}
                            requiredAutoClassName="form-control"
                            placeholder="language" />
                    </FormGroup>

                    <FormGroup className="editLanguageForm">
                        <Label for="exampleSelect">Proficiency</Label>
                        <Input type="select"
                            value={language.languageProficiencyId}
                            id="languageProficiencyId"
                            onChange={handleControlledInputChange}>
                            <option value="0"></option>
                            {
                                languageProficiencies.map(languageProficiency => {
                                    return (
                                        <>
                                            <option key={languageProficiency.id} value={languageProficiency.id}>
                                                {languageProficiency.proficiency}
                                            </option>
                                        </>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>

                    <div className="editLanguageSaveButton">
                        <Button onClick={event => {
                            event.preventDefault()
                            handleClickSaveLanguage()
                        }}>Save</Button>
                    </div>

                </Form>
            </Card>
        </Container>
    )
};

export default LanguageEdit;