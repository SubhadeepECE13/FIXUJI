import { setCurrentLanguage } from "@/utils/translator/liveTranslator";
import React, { useState } from "react";
import { View, Button, Alert } from "react-native";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  const handleChange = (newLang: string) => {
    setLang(newLang);
    setCurrentLanguage(newLang);
    Alert.alert("Language Changed", `Now showing ${newLang.toUpperCase()}`);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20,
      }}
    >
      <Button title="English" onPress={() => handleChange("en")} />
      <Button title="हिन्दी" onPress={() => handleChange("hi")} />
      <Button title="বাংলা" onPress={() => handleChange("bn")} />
    </View>
  );
}
