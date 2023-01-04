package com.example.manmu.controller;

import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class OpenviduController {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        log.debug("OpenviduController init");
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        log.debug(openvidu.toString());
        log.debug("OpenviduController init end");
    }


    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.debug("initializeSession");
        log.debug("params: {}", params);
        SessionProperties properties = SessionProperties.fromJson(params).build();
        log.debug("properties: {}", properties);
        Session session = openvidu.createSession(properties);
        log.debug("session: {}", session);
        log.debug("here we come");
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.debug("createConnection");
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        log.debug("connection: {}", connection);
        log.debug("connection end");
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }


}
