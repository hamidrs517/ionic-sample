import { Component } from '@angular/core';
import {
  CanvasWhiteboardComponent,
  CanvasWhiteboardOptions,
  CanvasWhiteboardService,
  CanvasWhiteboardUpdate,
} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-borad',
  templateUrl: 'borad.page.html',
  styleUrls: ['borad.page.scss'],
  viewProviders: [CanvasWhiteboardComponent],
})
export class BoradPage {
  canvasOptions: CanvasWhiteboardOptions = {
    drawButtonEnabled: true,
    drawButtonClass: "drawButtonClass",
    drawButtonText: "Draw",
    clearButtonEnabled: true,
    clearButtonClass: "clearButtonClass",
    clearButtonText: "Clear",
    undoButtonText: "Undo",
    undoButtonEnabled: true,
    redoButtonText: "Redo",
    redoButtonEnabled: true,
    colorPickerEnabled: true,
    saveDataButtonEnabled: true,
    saveDataButtonText: "Save",
    lineWidth: 5,
    strokeColor: "rgb(0,0,0)",
    shouldDownloadDrawing: true,
    imageUrl: "assets/img/blackboard.png"
  };
  constructor(private _canvasWhiteboardService: CanvasWhiteboardService) { }
  sample = [{ "x": 0.7707485381366035, "y": 0.13317288402759356, "type": 0, "UUID": "3d7f229b-186c-0e61-b1b4-c2ee8cf66d08", "selectedShape": "FreeHandShape", "selectedShapeOptions": { "shouldFillShape": true, "fillStyle": "rgba(0,0,0,0)", "strokeStyle": "rgb(0,0,0)", "lineWidth": 5, "lineJoin": "round", "lineCap": "round" } }, { "x": 0.7707485381366035, "y": 0.13317288402759356, "type": 2, "UUID": "3d7f229b-186c-0e61-b1b4-c2ee8cf66d08" }]
  onCanvasDraw(event: CanvasWhiteboardUpdate[]) {
    console.log("onCanvasDraw", JSON.stringify(event))

  }
  onCanvasClear(event: CanvasWhiteboardUpdate[]) {
    console.log("onCanvasClear", event)

  }
  onCanvasUndo(event: CanvasWhiteboardUpdate[]) {
    console.log("onCanvasUndo", event)

  }
  onCanvasRedo(event: CanvasWhiteboardUpdate[]) {
    console.log("onCanvasRedo", event)

  }

  click() {
    this.receiveNewMessage(this.sample)
  }

  public receiveNewMessage(newMessage: any): void {
    console.warn("newMessage", newMessage)
    // let updates = newMessage.map(updateJSON => CanvasWhiteboardUpdate.deserializeJson(updateJSON));
    this._canvasWhiteboardService.drawCanvas(newMessage);

    // switch (newMessage.type) {
    //   case VCDataMessageType.canvas_draw:
    // let updates = newMessage.data.map(updateJSON => CanvasWhiteboardUpdate.deserializeJson(JSON.parse(updateJSON)));
    // this._canvasWhiteboardService.drawCanvas(updates);
    //     break;
    //   case VCDataMessageType.canvas_clear:
    //     this._canvasWhiteboardService.clearCanvas();
    //     break;
    //   case VCDataMessageType.canvas_undo:
    //     this._canvasWhiteboardService.undoCanvas(newMessage.UUID);
    //     break;
    //   case VCDataMessageType.canvas_redo:
    //     this._canvasWhiteboardService.redoCanvas(newMessage.UUID);
    //     break;
    // }
  }
}
