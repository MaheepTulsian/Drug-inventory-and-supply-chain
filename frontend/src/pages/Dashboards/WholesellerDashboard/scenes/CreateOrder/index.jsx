import React, { useEffect, useState } from 'react';
import { tokens } from "../../../../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header";
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import './OlaMapsWebSDK/style.css';
import { OlaMaps } from './OlaMapsWebSDK/olamaps-js-sdk.es';
import { mockMapManufacturerData as dummyData } from '../../../../../data/mockData';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [hoverInfo, setHoverInfo] = useState(null); // State to store hover information
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const columns = [
        { field: "id", headerName: "Manufacturer id", flex: 1 },
        { field: "company_name", headerName: "Manufacturer Name", flex: 1 },
        { field: "city", headerName: "Location", flex: 1 },
    ];

    useEffect(() => {
        const olaMaps = new OlaMaps({
            apiKey: import.meta.env.VITE_OLA_MAPS_API_KEY,
        });

        const myMap = olaMaps.init({
            style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
            container: 'map',
            center: [78.9629, 23.5937],
            zoom: 3,
        });

        myMap.on('load', () => {
            myMap.addSource('my-data-source', {
                type: 'geojson',
                data: dummyData,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            myMap.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'my-data-source',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 3, '#f1f075', 5, '#f28cb1'],
                    'circle-radius': ['step', ['get', 'point_count'], 20, 2, 30, 4, 40],
                },
            });

            myMap.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'my-data-source',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': ['get', 'point_count'],
                    'text-size': 12,
                },
            });

            myMap.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'my-data-source',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 10,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
                },
            });
        });

        myMap.on('click', 'unclustered-point', (e) => {
            const features = myMap.queryRenderedFeatures(e.point, {
                layers: ['unclustered-point'],
            });

            if (features.length) {
                const id = features[0].properties.id;
                navigate(`./${id}`);
            }
        });

        // Hover event for showing the pill card
        myMap.on('mousemove', 'unclustered-point', (e) => {
            const features = myMap.queryRenderedFeatures(e.point, {
                layers: ['unclustered-point'],
            });

            if (features.length) {
                const feature = features[0];
                const manufacturerName = feature.properties.company_name; // Assuming 'name' contains Manufacturer name
                const pixelCoordinates = myMap.project(e.lngLat); // Get pixel position on the map

                setHoverInfo({
                    name: manufacturerName,
                    x: pixelCoordinates.x, // Use pixel position for pill location
                    y: pixelCoordinates.y,
                });
            }
        });

        // Hide pill card when the mouse leaves the point
        myMap.on('mouseleave', 'unclustered-point', () => {
            setHoverInfo(null);
        });

        setMap(myMap);
    }, [navigate]);

    return (
        <Box m="20px">
            <Header title="INVENTORY" subtitle="Manage Medicine Inventory" />
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    height: '450px',
                    padding: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative', // Ensure pill can be positioned relative to the map container
                }}
            >
                <div id="map" style={{ width: '100%', height: '100%' }}></div>

                {/* Render the pill-like popup when hovering */}
                {hoverInfo && (
                    <Paper
                        elevation={3}
                        sx={{
                            position: 'absolute',
                            left: `${hoverInfo.x}px`, // Position based on x-coordinate
                            top: `${hoverInfo.y}px`, // Position based on y-coordinate
                            transform: 'translate(-50%, -100%)', // Center above the point
                            padding: '6px 10px',
                            bgcolor: '#333',
                            color: '#fff',
                            borderRadius: '16px',
                            pointerEvents: 'none', // Prevent the pill from interfering with events
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Typography variant="body2">{hoverInfo.name}</Typography>
                    </Paper>
                )}
            </Paper>

            <Box
                m="40px 0 20px 0"
                height="65vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                }}
            >
                <DataGrid
                    rows={dummyData.features.map((feature) => ({
                        id: feature.properties.id,
                        company_name: feature.properties.company_name,
                        city: feature.properties.city,
                    }))}
                    columns={columns}
                    getRowId={(row) => row.id}
                    onRowClick={(params) => {
                        navigate(`./${params.row.id}`); // Navigate to Batch Details page with manufacturer ID
                    }}
                />
            </Box>
        </Box>
    );
};

export default MapComponent;
