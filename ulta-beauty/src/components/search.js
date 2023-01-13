import React, { useState } from 'react';
import SearchResults from './search-results';

import { Button, Input, Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {

    const [searchText, setSearchText] = useState({ text: '' });
    const [searchResults, setSearchResults] = useState([]);
    const [facets, setfacets] = useState([]);

    const handleOnChange = (e) => {
        setSearchText(prevState => ({
            ...prevState,
            text: e.target.value,
        }));
    };

    const handleOnSearch = async (value) => {
        const { text, facets } = value;
        if (text) {
            const url =  `https://api-dot-abs-poc-np-prj-01-3f2a.uc.r.appspot.com/search?text=${text}${facets && facets.length? `&facets=${facets}` : ''}`;  
            const searchResults = await fetch(url)
                .then(res => res.json())
                .catch(err => console.log(err));
            setSearchResults(searchResults.results.length ? [...searchResults.results] : []);
            setfacets(searchResults.facets.length ? [...searchResults.facets] : []);
        }
    }

    const handleImageClick = () => {
        setSearchText(prevState => ({
            ...prevState,
            text: ''
        }));
        setSearchResults([]);
        setfacets([]);
    }

    return (
        <>
            {searchResults.length > 0 &&
                <>
                    <div>
                        <Row style={{
                            alignItems: 'center'
                        }}
                        >
                            <Col span={5} style={{
                                margin: '1rem'
                            }}
                            >
                                <span style={{
                                    margin: '1rem 0',
                                    // width: '7rem',
                                    height: 'auto',
                                }}
                                    onClick={() => handleImageClick()}
                                >
                                    <img src='ultabeauty.png' alt="google" style={{
                                        // width: '100%'
                                    }}
                                    />
                                </span>
                            </Col>
                            <Col span={12} style={{
                                margin: '0 1rem'
                            }}
                            >
                                <Input
                                    size='large'
                                    placeholder="Input Search Text"
                                    value={searchText.text}
                                    allowClear
                                    prefix={<SearchOutlined style={{ color: "#d9d9d9", margin: '0 0.5rem' }} />}
                                    onChange={handleOnChange}
                                    onPressEnter={() => handleOnSearch(searchText, 2)}
                                />
                            </Col>
                        </Row>
                    </div>
                    <SearchResults searchResults={searchResults} facets={facets} onSelectFacet={(val) => handleOnSearch({ text: searchText.text, facets: val  } )} />
                </>
            }
            {searchResults.length === 0 &&
                <div style={{
                    textAlign: 'center',
                    marginTop: '1rem',
                    top: '50%'
                }}>
                    <Row>
                        <Col span={12} offset={6}>
                            <div className='App'>
                                {/* <Typography.Title
                                        style={{ fontSize: '3rem', color: '#000000 ' }}>
                                        {CONFIGS.title}
                                    </Typography.Title> */}
                                <span>
                                    <img src='ultabeauty.png' alt="google" style={{
                                        width: '12rem',
                                        height: 'auto',
                                        marginBottom: '2rem'
                                    }}
                                    />
                                </span>

                                <Input
                                    size='large'
                                    placeholder="Input Search Text"
                                    value={searchText.text}
                                    allowClear
                                    prefix={<SearchOutlined style={{ color: "#d9d9d9", margin: '0 0.5rem' }} />}
                                    onChange={handleOnChange}
                                    onPressEnter={() => handleOnSearch(searchText)}
                                />
                                <Button type='primary' style={{
                                    margin: '2rem 1rem',
                                    minWidth: '7rem',
                                    minHeight: '2.5rem',
                                    background: '#b5904a'
                                }}
                                    onClick={() => handleOnSearch(searchText)}
                                > Search </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}

export default Search;