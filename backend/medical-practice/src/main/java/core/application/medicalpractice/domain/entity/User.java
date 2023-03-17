package core.application.medicalpractice.domain.entity;

public class User {
    private String firstName;
    private String lastName;
    private String gender;
    private String mail;
    private String password;

    public User(String firstName, String lastname, String gender, String mail, String password) {
        this.firstName = firstName;
        this.lastName = lastname;
        this.gender = gender;
        this.mail = mail;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User [firstname=" + this.firstName + ", lastname=" + this.lastName + ", gender=" + this.gender
                + ", mail=" + this.mail + ", password=" + this.password + "]";
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
