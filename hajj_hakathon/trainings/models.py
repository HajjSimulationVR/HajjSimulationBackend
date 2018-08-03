from django.db import models
from django.conf import settings

from model_utils.models import TimeStampedModel
from django.utils.translation import ugettext_lazy as _


class Training(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=128)
    description = models.TextField(_('Description'))
    image = models.ImageField(_('Image'), upload_to='training_units//%Y/%m/%d', null=True, blank=True)

    def __str__(self):
        return self.name


class Progress(TimeStampedModel):
    training = models.ForeignKey('Training', related_name='progresses', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='progresses', on_delete=models.CASCADE)
    percentage = models.CharField(_('Percentage'), max_length=128)

    def __str__(self):
        return '{} - {}'.format(self.user, self.percentage)
