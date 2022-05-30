import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signOut } from "firebase/auth";
import { Images, Colors, auth, db } from "../config";
import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { patenteSchema } from "../utils";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
export const HomeScreen = () => {
  const [errorState, setErrorState] = useState("");
  const [clientes, setClientes] = useState([]);
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const handleLogin = (values) => {
    const { email, password } = values;
  };

  const dbInstance = collection(db, "clientes");
  const getClients = () => {
    getDocs(dbInstance).then((data) => {
      setClientes(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };
  useEffect(() => {
    getClients();
  }, []);

  console.log(clientes);

  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <Text style={styles.title}>Buscador</Text>
          <Formik
            initialValues={{
              patente: "",
            }}
            validationSchema={patenteSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="patente"
                  leftIconName="truck"
                  placeholder="Ingrese la patente"
                  autoCapitalize="none"
                  keyboardType="default"
                  textContentType="none"
                  autoFocus={true}
                  value={values.patente}
                  onChangeText={handleChange("patente")}
                  onBlur={handleBlur("patente")}
                />
                <FormErrorMessage
                  error={errors.patente}
                  visible={touched.patente}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Buscar Patente</Text>
                </Button>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <Button title="Deslogearse" onPress={handleLogout} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 8,
  },
  footer: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
    paddingTop: 20,
  },
});
