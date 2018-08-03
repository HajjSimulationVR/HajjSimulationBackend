from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import Training, Progress

from hajj_hakathon.users.models import User


class UserDefault:
    def set_context(self, serializer_field):
        self.user = User.objects.first()

    def __call__(self):
        return self.user


class TrainingDefault:
    def set_context(self, serializer_field):
        training_pk = serializer_field.context['view'].kwargs['training_pk']
        self.progress = Training.objects.get(pk=training_pk)

    def __call__(self):
        return self.progress


class TrainingSerializser(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()

    class Meta:
        model = Training
        fields = ('pk', 'name', 'description', 'image', 'percentage')

    def get_percentage(self, obj):
        try:
            return obj.progresses.get(user=User.objects.first()).percentage
        except:
            return 0


class TrainingProgressSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=UserDefault())
    training = serializers.HiddenField(default=TrainingDefault())

    class Meta:
        model = Progress
        fields = ('pk', 'percentage', 'user', 'training')
        validators = [
            UniqueTogetherValidator(
                queryset=Progress.objects.all(),
                message='you create progress for this user before',
                fields=('user', 'training')
            )
        ]
