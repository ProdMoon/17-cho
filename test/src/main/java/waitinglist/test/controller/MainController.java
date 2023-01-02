package waitinglist.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping("/liketest")
    public String index() {
        return "liketest";
    }
}
