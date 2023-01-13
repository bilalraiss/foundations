import React, { useState } from 'react';
import './search-results.css';

import { Typography, Col, Row, Card, Select, Checkbox, Collapse } from 'antd';
import { LinkOutlined, FilterFilled  } from '@ant-design/icons';
const { Meta } = Card;
const { Panel } = Collapse;

const SearchResults = ({ searchResults, facets, onSelectFacet }) => {

    const availabilityMap = new Map();
    availabilityMap.set('IN_STOCK', 'In Stock');
    availabilityMap.set('OUT_OF_STOCK', 'Out of Stock');
    // const [filters, setFilters] = useState('()');

    const facetOptions = [
        {
            value: 'brands',
            label: 'Brands'
        },
        {
            value: 'colorFamilies',
            label: 'Color Family'
        },
        {
            value: 'colors',
            label: 'Colors'
        },
        {
            value: 'availability',
            label: 'Availability'
        }
    ];
    const facetMap = new Map();
    facetOptions.forEach(facet => facetMap.set(facet.value, facet.label));

    const onChangeHandler = (value) => {
        if (value) {
            onSelectFacet(value)
        }
    };

    const onChangeCheckboxHandler = (filterValue, filterKey) => {
        console.log('filterValue', filterValue);
        console.log('filterKey', filterKey);

      };
      
    return (
        <>
            {searchResults.length > 0 &&
                <Row>
                    <Col span={5}>
                        <div style={{ margin: '0 1rem' }}>
                            <Typography.Title
                                style={{ fontSize: '1.5rem', color: '#000000 ' }}
                            >
                                Filters <FilterFilled style={{ fontSize: '1.2rem', color: '#b5904a ' }}  />
                            </Typography.Title>
                            <Typography.Title
                                style={{ fontSize: '1rem', color: '#000000 ' }}
                            >
                                Add Facets to filter
                            </Typography.Title>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width:'100%' }}
                                placeholder="Select facets to filter"
                                onChange={(val) => onChangeHandler(val)}
                                options={facetOptions}
                            />
                            { facets.length > 0 && facets.map((facet, i) =>
                                <Collapse ghost>
                                    <Panel header={facetMap.get(facet.key)} key={i} style={{ fontSize: '0.9rem', color: '#000000 ' }}>
                                        <Checkbox.Group class="verticalCheckBox" options={[...facet.values.map((f) => ({label: f.value, value: f.value}) )]}
                                            onChange={(val) => onChangeCheckboxHandler(val, facet.key)} />
                                    </Panel>
                                </Collapse>
                            )}
                        </div>
                    </Col>  
                    <Col span={19}>
                        <Row>
                            {
                                searchResults.map((rec, i) =>
                                    <Col span={6} key={i}   >
                                        <Card   
                                            hoverable
                                            style={{ margin: '1rem' }}
                                            cover={<img alt="example" src={rec.product.images[0].uri} />}
                                        >
                                            <Meta title={`${rec.product.title}`} />
                                            <p><strong>Brand: </strong> {rec.product.brands[0]}</p>
                                            <p><strong>Price: </strong> {`${rec.product.priceInfo.price} ${rec.product.priceInfo.currencyCode}`}</p>
                                            <p><strong>Availability: </strong> {availabilityMap.get(rec.product.availability)} <a href={rec.product.uri} target="_blank" rel='noreferrer'><LinkOutlined style={{ color: '#b5904a'}} /></a> </p>
                                        </Card>
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            }
        </>
    )
}

export default SearchResults;