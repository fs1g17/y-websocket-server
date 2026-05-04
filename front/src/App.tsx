import "./App.css";
import { Doc } from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { useEffect, useRef } from "react";
import { editor } from "monaco-editor";

function App() {
  const yDocRef = useRef<Doc>(null);

  useEffect(() => {
    if (yDocRef.current) return; // don't recreate the Doc

    yDocRef.current = new Doc();
    const provider = new WebsocketProvider(
      "ws://localhost:1234",
      "monaco",
      yDocRef.current,
    );

    provider.on("status", (event) => {
      console.log(event.status);
    });

    const type = yDocRef.current.getText("monaco");

    const monacoEditorDiv = document.getElementById("monaco-editor");
    if (!monacoEditorDiv) return;

    const monacoEditor = editor.create(monacoEditorDiv, {
      value: "",
      language: "go",
      theme: "vs-dark",
    });

    const model = monacoEditor.getModel();
    if (!model) return;

    const monacoBinding = new MonacoBinding(
      type,
      model,
      new Set([monacoEditor]),
      provider.awareness,
    );
  }, []);

  return <div id="monaco-editor"></div>;
}

export default App;
