import { useState, Suspense } from "react";

const Hello = () => {
  const showMainDiv = true;
  const [konvaComponents, setKonvaComponents] = useState<any>({});

  const importKonvaComponents = () => {
    Promise.all([
      import("react-konva").then((module) => ({ Stage: module.Stage })),
      import("react-konva").then((module) => ({ Layer: module.Layer })),
      import("react-konva").then((module) => ({ Text: module.Text })),
    ]).then((modules) => {
      const importedComponents = modules.reduce((acc, module) => {
        return { ...acc, ...module };
      }, {});
      setKonvaComponents(importedComponents);
    });
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={importKonvaComponents}>Load Konva Components</button>
      {showMainDiv && (
        <Suspense fallback={<div>Loading...</div>}>
          {konvaComponents.Stage &&
            konvaComponents.Layer &&
            konvaComponents.Text && (
              <konvaComponents.Stage width={500} height={500}>
                <konvaComponents.Layer>
                  <konvaComponents.Text text='Hello World' />
                  <konvaComponents.Text text='Hello Worldnnxznnzxnx' />
                </konvaComponents.Layer>
              </konvaComponents.Stage>
            )}
        </Suspense>
      )}
    </div>
  );
};

export default Hello;
