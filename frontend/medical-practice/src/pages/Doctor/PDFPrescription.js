import React from "react";
import { Document, Page, Text } from '@react-pdf/renderer';
import { View, StyleSheet } from "@react-pdf/renderer";
import { format } from "../../utils/DateFormat";


const PDF = ({ data, infoConsultation, medicaments }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: 20,
        },
        name: {
            fontSize: 20,
            textAlign: 'left',
        },
        speciality: {
            fontSize: 12,
            textAlign: 'left',
            marginTop: 10,
        },
        address: {
            fontSize: 12,
        },
        patient: {
            textAlign: 'right',
            marginTop: 40,
            fontSize: 14,
            fontWeight: 'bold',
        },
        line: {
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginTop: 10,
            marginBottom: 10,
        },
        medicaments: {
            marginTop: 15,
            textTransform: 'uppercase',
            marginBottom: 5,
            fontSize: 12,
        },
        date: {
            marginTop: 20,
            marginBottom: 40,
            fontSize: 12,
            textAlign: 'right',
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.name}>Docteur {data.firstName} {data.lastName}</Text>
                </View>
                <View>
                    <Text style={styles.speciality}>{data.speciality}</Text>
                </View>
                <Text style={{...styles.line, width: `${Math.max(("351 Cours de la Libération - 33400 Talence".length)*6, (data.firstName.length + data.lastName.length + 8)*10)}px`}}></Text>
                <View>
                    <Text style={styles.address}>Medicolib</Text>
                    <Text style={styles.address}>351 Cours de la Libération - 33400 Talence</Text>
                </View>
                <View>
                    <Text style={styles.speciality}>{data.mail}</Text>
                </View>
                <View>
                    <Text style={styles.patient}>{infoConsultation.firstname}  {infoConsultation.lastname}</Text>
                </View>
                <View>
                    <Text style={styles.date}>Talence, le {format.formatDate(infoConsultation.date)}</Text>
                </View>
                <View>
                    {medicaments.map((medicament, index) => (
                        <View key={index}>
                            <Text style={styles.medicaments}>- {medicament}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default PDF;