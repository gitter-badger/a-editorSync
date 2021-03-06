/**
 * Copyright 2015, Rodrigo Prestes Machado
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * 		http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
$(document).ready(function() {
	
	var aEditor = document.querySelector("a-editor");
	
	// Create a new instance of the websocket
	webSocket = null;
    if (window.MozWebSocket)
    	webSocket = new MozWebSocket("ws://REPLACE_URL:REPLACE_PORT/A-EditorSync/document");
	else
		webSocket = new WebSocket("ws://REPLACE_URL:REPLACE_PORT/A-EditorSync/document");
    
    webSocket.onmessage = function(event){
    	if (event.data == "del")
    		aEditor.deleteKey();
    	else
    		aEditor.insertKey(event.data);
    };
    
    aEditor.addEventListener("htmlText", function(e) {
        alert(e.detail.htmlText);
    });
    
    aEditor.addEventListener("insertKey", function(e) {
        webSocket.send(e.detail.insertKey);
    });
    
    aEditor.addEventListener("deleteKey", function(e) {
        webSocket.send("del");
    });
    
    // Hides the send button (not necessary to synchronizer)
    var actionButton = document.getElementById("actionButton");
    actionButton.style.display = "none";
    
});