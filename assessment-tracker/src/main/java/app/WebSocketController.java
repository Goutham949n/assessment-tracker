package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	private final SimpMessagingTemplate template;
	
	@Autowired
	public WebSocketController(SimpMessagingTemplate template) {
		this.template = template;
	}
	
	/*@MessageMapping("send/message")
	public void onReceivedMessage(String message) {
		this.template.convertAndSend("/chat", new SimpleDateFormat("HH:mm:ss").format(new Date())+" - "+message);
	}*/
	
	@MessageMapping("send/message/student")
	public void onReceivedMessageFromStudent(String message) {
		this.template.convertAndSend("/chat", message);
	}
	
	@MessageMapping("send/message/evaluator")
	public void onReceivedMessageFromEvaluator(String message) {
		this.template.convertAndSend("/chat", message);
	}
}
