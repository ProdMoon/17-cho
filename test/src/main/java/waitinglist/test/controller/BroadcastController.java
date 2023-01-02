package waitinglist.test.controller;


import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.web.bind.annotation.*;
import waitinglist.test.UserData;
import waitinglist.test.domain.Member;
import waitinglist.test.repository.MemberRepository;
import java.util.List;

@RestController
@RequestMapping("/api/broadcasting/initialroom/readyqueue")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BroadcastController {

    private final MemberRepository memberRepository;

    public BroadcastController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @GetMapping
    @ResponseBody
    public List<Member> getReadyQueue() {
        return memberRepository.findAll();
    }

    @PostMapping
    @ResponseBody
    public List<Member> addMemberInRepository(@RequestBody UserData userData) {
        memberRepository.addMember(userData.getId(), userData.getName());
        return memberRepository.findAll();
    }

    @DeleteMapping
    @ResponseBody
    public List<Member> removeMemberInRepository(@RequestBody UserData userData) {
        memberRepository.removeById(userData.getId());
        return memberRepository.findAll();
    }
    @DeleteMapping("/popfront")
    @ResponseBody
    public Member popFrontMemberInRepository() {
        return memberRepository.popFront();
    }
}
