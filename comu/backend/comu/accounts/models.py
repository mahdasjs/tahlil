from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, password=None, 
                     is_staff=False):
        """
        Creates and saves a User with a given email and password.
        """
        email = self.normalize_email(email)
        user = self.model(username=username,
                          email=email,
                          first_name=first_name,
                          last_name=last_name,
                          is_staff=is_staff,
                    )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, username, email, first_name, last_name, password):
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, first_name, last_name, password):
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_superuser=True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user
    

class User(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.
    Email and password are required. Other fields are optional.
    """
    username = models.CharField(_('username'), max_length=50, blank=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    email = models.EmailField(_('email address'), max_length=255, unique=True)
    follower_num = models.IntegerField(_('follower numbers'), default=0)
    following_num = models.IntegerField(_('following numbers'), default=0)
    playlist_num = models.IntegerField(_('playlist numbers'), default=0, null=True)
    post_num = models.IntegerField(_('post numbers'), default=0)
    is_staff = models.BooleanField(_('staff status'), default=True,
        help_text=_('Designates whether the user can log into this admin '
                    'site.'))
    is_active = models.BooleanField(_('active'), default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    is_verified = models.BooleanField(_('verified'), default=False,
        help_text=_('Designates whether this user has completed the '
                    'email verification process to allow login.'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username' ,'first_name', 'last_name']

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    objects = UserManager()


class Profile(models.Model):
    public = "public"
    private = "private"
    user_profile = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        related_name="user_profile"
    )
    profile_picture = models.ImageField(
        verbose_name="profile_picture",
        upload_to="profile_picture",
        blank=True,
        null=True
    )
    header_picture = models.ImageField(
        verbose_name="header_picture",
        upload_to="header_picture",
        blank=True,
        null=True
    )
    birth_date = models.DateField(
        null=True,
        blank=True
    )
    bio = models.CharField(
        max_length=300,
        default='',
        blank=True
    )
    follow = models.ManyToManyField(
        to=User,
        related_name="followed_by",
        blank=True
    )
    follow_request = models.ManyToManyField(
        to=User,
        related_name="follow_request",
        blank=True
    )
    profile_status = models.CharField(
        verbose_name="profile_status",
        max_length=100,
        choices=(
            (public, "public"),
            (private, "private"),
        ),
        default=public,
    )
    created = models.DateTimeField(
        verbose_name="created",
        auto_now_add=True
    )
    def __str__(self):
        return f"ID: {self.id} - {self.user_profile.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, **kwargs):
    profile, created = Profile.objects.get_or_create(user_profile=instance)
    if created:
        profile.save()
