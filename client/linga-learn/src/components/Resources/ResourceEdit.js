import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { LanguageContext } from "../../providers/LanguageProvider";
import { ResourceTypeContext } from "../../providers/ResourceTypeProvider.js";
import { ResourceContext } from "../../providers/ResourceProvider.js";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const ResourceEdit = (props) => {
    const history = useHistory();
    const { ResourceId } = useParams();
    const { GetUserLanguages } = useContext(LanguageContext);
    const { getResourceTypes } = useContext(ResourceTypeContext);
    const { getResourceByResourceId, editResource } = useContext(ResourceContext);



    const [languages, setLanguages] = useState([]);
    const [resourceTypes, setResourceTypes] = useState([]);
    const [resource, setResource] = useState({
        resourceTypeId: 0,
        languageId: 0,
        source: "",
    });


    useEffect(() => {
        getResourceByResourceId(ResourceId)
            .then(resourceObject => setResource(resourceObject))
        GetUserLanguages()
            .then(languagesArray => setLanguages(languagesArray))
        getResourceTypes()
            .then(resourceTypeArray => setResourceTypes(resourceTypeArray))
    }, []);


    const handleControlledInputChange = (event) => {
        const newResource = { ...resource }
        newResource[event.target.id] = event.target.value
        setResource(newResource)
    }

    const handleClickEditResource = () => {
        editResource({
            id: ResourceId,
            resourceTypeId: resource.resourceTypeId,
            languageId: resource.languageId,
            source: resource.source,
        })
            .then(() => history.push("/resources"))
    };



    return (
        <>
            <Form>





                <FormGroup>
                    <Label for="languageId">Language</Label>
                    <Input type="select" id="languageId" onChange={handleControlledInputChange}>
                        <option value="0"></option>
                        {
                            languages.map(language => {
                                return (
                                    <>
                                        <option key={language.id} value={language.id}>
                                            {language.languageName}
                                        </option>
                                    </>
                                )
                            })
                        }
                    </Input>
                </FormGroup>





                <FormGroup>
                    <Label for="resourceTypeId">Resource Type</Label>
                    <Input type="select" id="resourceTypeId" onChange={handleControlledInputChange}>
                        <option value="0"></option>
                        {
                            resourceTypes.map(resourceType => {
                                return (
                                    <>
                                        <option key={resourceType.id} value={resourceType.id}>
                                            {resourceType.type}
                                        </option>
                                    </>
                                )
                            })
                        }
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="source">Resource</Label>
                    <Input type="text"
                        onChange={handleControlledInputChange}
                        requiredAutoClassName="form-control"
                        name="source"
                        id="source"
                        value={resource.source} />
                </FormGroup>


                <Button onClick={handleClickEditResource}>Save</Button>

            </Form>
        </>
    );
};

export default ResourceEdit;