from django.contrib import admin
from .models import interview_stepname
from .models import test
from .models import NewPositionData
from .models import PD

# Register your models here.
admin.site.register(interview_stepname)
admin.site.register(test)
admin.site.register(NewPositionData)
admin.site.register(PD)
