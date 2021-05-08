import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { LanguageContext } from "../../providers/LanguageProvider.js";
import {
    Container, Row, Col, Card, CardTitle, CardText, CardBody,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Button
} from 'reactstrap';






const LanguageList = (props) => {
    const history = useHistory();
    const { GetUserLanguages } = useContext(LanguageContext);
    const [languages, setLanguages] = useState([]);
    const [knownLanguages, setKnownLanguages] = useState([]);
    const [learningLanguages, setLearningLanguages] = useState([]);
    const [futureLanguages, setFutureLanguages] = useState([]);



    //---------------------------FOR LIST----------------------------------------------------

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);



    useEffect(() => {
        GetUserLanguages()
            .then(resp => setLanguages(resp))
    }, []);

    useEffect(() => {
        const knownLanguages = languages.filter(language => language.languageProficiencyId === 1)
        setKnownLanguages(knownLanguages)
    }, [languages]);

    useEffect(() => {
        const learningLanguages = languages.filter(language => language.languageProficiencyId === 2)
        setLearningLanguages(learningLanguages)
    }, [languages]);

    useEffect(() => {
        const futureLanguages = languages.filter(language => language.languageProficiencyId === 3)
        setFutureLanguages(futureLanguages)
    }, [languages]);

    const handleManageClick = () => {
        const showEditKnownLanguagesButton = document.getElementById("EditKnownLanguagesButton");
        showEditKnownLanguagesButton.style.visibility = "visible";

        const showDeleteKnownLanguagesButton = document.getElementById("DeleteKnownLanguagesButton");
        showDeleteKnownLanguagesButton.style.visibility = "visible";

        const showEditLearningLanguagesButton = document.getElementById("EditLearningLanguagesButton");
        showEditLearningLanguagesButton.style.visibility = "visible";

        const showDeleteLearningLanguagesButton = document.getElementById("DeleteLearningLanguagesButton");
        showDeleteLearningLanguagesButton.style.visibility = "visible";

        const showEditFutureLanguagesButton = document.getElementById("EditFutureLanguagesButton");
        showEditFutureLanguagesButton.style.visibility = "visible";

        const showDeleteFutureLanguagesButton = document.getElementById("DeleteFutureLanguagesButton");
        showDeleteFutureLanguagesButton.style.visibility = "visible";
    }



    return (
        <>
            <Container className="languageContainer">
                <Row xs="3">
                    <Container>
                        <Label tag="h5">Know</Label>
                        {
                            knownLanguages.map(knownLanguage => {
                                return <Card key={knownLanguage.id}>
                                    <CardBody>{knownLanguage.languageName}</CardBody>
                                    <Button id="EditKnownLanguagesButton">✏</Button>
                                    <Button id="DeleteKnownLanguagesButton">✖</Button>
                                </Card>
                            })
                        }
                    </Container>

                    <Container>
                        <Label tag="h5">Learning</Label>
                        {
                            learningLanguages.map(learningLanguage => {
                                return <Card key={learningLanguage.id}>
                                    <CardBody>{learningLanguage.languageName}</CardBody>
                                    <Button id="EditLearningLanguagesButton">✏</Button>
                                    <Button id="DeleteLearningLanguagesButton">✖</Button>
                                </Card>
                            })
                        }
                    </Container>

                    <Container>
                        <Label tag="h5">Future</Label>
                        {
                            futureLanguages.map(futureLanguage => {
                                return <Card key={futureLanguage.id}>
                                    <CardBody>{futureLanguage.languageName}</CardBody>
                                    <Button id="EditFutureLanguagesButton">✏</Button>
                                    <Button id="DeleteFutureLanguagesButton">✖</Button>
                                </Card>
                            })
                        }
                    </Container>

                </Row>



                <Row>

                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle>
                            <Col sm={{ size: 'auto', offset: 1 }}>...</Col>
                        </DropdownToggle>
                        <DropdownMenu container="body">
                            <DropdownItem onClick={() => {
                                history.push("/AddLanguage")
                            }} >Add</DropdownItem>
                            <DropdownItem id="hideFlashcardCollectionButtonVisibility"
                                onClick={handleManageClick}>Manage
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Row>


            </Container>

        </>
    );
};



export default LanguageList;