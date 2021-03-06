package com.group4T.homestaybooking.HomestayBooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.group4T.homestaybooking.HomestayBooking.model.NotificationEmail;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MailService {
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private MailContentBuilder mailContentBuilder;
	
	@Async
    void sendMail(NotificationEmail notificationEmail) throws RuntimeException {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("homestaybooking@hust.com");
            messageHelper.setTo(notificationEmail.getRecipient());
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(notificationEmail.getBody());
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            throw new RuntimeException("Exception occurred when sending mail to " + notificationEmail.getRecipient(), e);
        }
    }
	
}
