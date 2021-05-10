import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider";
import { LanguageProficiencyContext } from "../../providers/LanguageProficiencyProvider";
import { Button, Card, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';



const LanguageAdd = (props) => {

    const history = useHistory();
    const { addLanguage } = useContext(LanguageContext)
    const { getLanguageProficiencies } = useContext(LanguageProficiencyContext)


    const [languageProficiencies, setLanguageProficiencies] = useState([]);


    useEffect(() => {
        getLanguageProficiencies()
            .then(resp => setLanguageProficiencies(resp))
    }, []);



    const [language, setLanguage] = useState({
        languageName: "",
        languageProficiencyId: 0,
    });


    const handleControlledInputChange = (event) => {
        const newLanguage = { ...language }
        newLanguage[event.target.id] = event.target.value
        setLanguage(newLanguage)
    }



    const handleClickAddLanguage = () => {
        addLanguage({
            languageName: language.languageName,
            languageProficiencyId: language.languageProficiencyId
        })
            .then(() => history.push("/"))
    };





    return (
        <Container>
            <Row xs="2">
                <Card>
                    <Form>
                        <FormGroup>
                            <Label for="languageName">Language</Label>
                            <Input type="text" id="languageName" value={language.languageName} onChange={handleControlledInputChange} requiredAutoClassName="form-control" placeholder="language" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="languageProficiencyId">Proficiency</Label>
                            <Input type="select" id="languageProficiencyId" onChange={handleControlledInputChange}>
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

                        <Button onClick={event => {
                            event.preventDefault()
                            handleClickAddLanguage()
                        }}>Add</Button>
                    </Form>
                </Card>
            </Row>



        </Container>
    );
};

export default LanguageAdd;