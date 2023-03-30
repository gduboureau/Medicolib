import React from "react";
import { Document, Page, Text } from '@react-pdf/renderer';
import { View, StyleSheet } from "@react-pdf/renderer";


const PDF = ({ infoConsultation, medicaments }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: 20,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            border: "1px solid #000",
        },
        label: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 5,
            textTransform: "uppercase",
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 5,
            marginBottom: 10,
            width: "100%",
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.label}>Date:</Text>
                    <Text>{infoConsultation.date}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Motif de la consultation:</Text>
                    <Text>{infoConsultation.motif}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Prescription:</Text>
                    {medicaments.map((medicament, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={styles.label}></Text>
                            <Text>{medicament}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default PDF;